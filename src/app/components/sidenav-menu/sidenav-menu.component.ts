import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {categories, category, clientCategories} from "../../store/app/app.selectors";
import {MatDialog} from "@angular/material/dialog";
import {loadDishesByCategory, removeCategoryByID, uploadCategory} from "../../store/app/app.actions";
import {DialogComponent} from "../../shared/dialog/dialog.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Category} from "../../shared/interfaces";
import {existingNameValidator} from "../../shared/async.validators";
import {skip, tap} from "rxjs/operators";

@Component({
  selector: 'app-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.scss']
})
export class SidenavMenuComponent implements OnInit, OnChanges {


  @Input() toggleChanged: boolean = false
  @Input() onSwitched: boolean = false
  @ViewChild('drawer') drawer: any

  category = this.store.pipe(select(category))
  categories = this.store.pipe(select(categories))
  clientCategories = this.store.pipe(select(clientCategories))

  onAdd: boolean = true
  isManager: any = false
  newCategoryName = ''

  categoriesName = this.store.pipe(select(categories), skip(1), tap(res => {
    const allNames = res.map(el => el.categoryName.toUpperCase())
    this.newCategoryForm = new FormGroup({
      categoryName: new FormControl('', Validators.required, [existingNameValidator(allNames)]),
      categoryAvailable: new FormControl(false)
    })
  })).subscribe()

  newCategoryForm: FormGroup = {} as FormGroup

  constructor(private store: Store<any>,
              private dialog: MatDialog,
              private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.toggleChanged && !changes.toggleChanged.firstChange) {
      this.drawer.toggle()
      this.newCategoryForm.reset()
      this.onAdd = true
      this.newCategoryName = ''
    }
    if (changes.onSwitched && !changes.onSwitched.firstChange) {
      this.isManager = changes.onSwitched.currentValue
    }
  }

  onSelectCategory(id: string) {
    this.store.dispatch(loadDishesByCategory({category: id}))
  }

  onAddCategory() {
    this.onAdd = false
    this.newCategoryName = 'CATEGORY NAME'
  }

  createCategory() {
    if (this.newCategoryForm.valid && this.newCategoryForm.value.categoryName.trim()) {
      this.newCategoryForm.patchValue({categoryAvailable: false})
      this.store.dispatch(uploadCategory({category: this.newCategoryForm.value as Category}))
      this.onAdd = true
      this.newCategoryForm.reset()
      this.openSnackBar('Created!')
    }
  }

  removeCategory(id: string) {
    this.store.dispatch(removeCategoryByID({id}))
    this.openSnackBar('Removed!')
  }

  openDialog(id: string) {
    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.removeCategory(id)
    });
  }

  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
      panelClass: ['snackBar']
    });
  }
}
