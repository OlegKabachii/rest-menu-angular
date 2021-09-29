import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {ThemePalette} from "@angular/material/core";
import {categories, category, selectDishes, selectedCategory} from "../../store/app/app.selectors";
import {MatDialog} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {updateCategoryByID} from "../../store/app/app.actions";
import {Category} from "../../shared/interfaces";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-manager-menu',
  templateUrl: './manager-menu.component.html',
  styleUrls: ['./manager-menu.component.scss']
})
export class ManagerMenuComponent implements OnInit {

  allCategoriesName: string[] = []
  categoriesName = this.store.pipe(select(categories)).subscribe(res => this.allCategoriesName = res.map(el => el.categoryName.toUpperCase()))

  categoryForm: FormGroup = new FormGroup({
    categoryName: new FormControl('', [Validators.required]),
    categoryAvailable: new FormControl(false, Validators.required)
  })

  categories = this.store.pipe(select(categories))
  dishes = this.store.pipe(select(selectDishes))
  category = this.store.pipe(select(category))
  selectedCategory = this.store.pipe(select(selectedCategory))

  color: ThemePalette = 'warn';
  checked = true;
  isCategoryAvailable = this.categoryForm.value.categoryAvailable

  constructor(
    private store: Store<any>,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.category.pipe(filter(Boolean)).subscribe((res: Category | any) => {
      this.categoryForm.patchValue({
        categoryName: res?.categoryName,
        categoryAvailable: res?.categoryAvailable
      }, {emitEvent: false})
    })
  }

  updateCategory() {
    if (this.categoryForm.valid && this.categoryForm.value.categoryName.trim()) {
      this.selectedCategory.subscribe(res => {
        this.store.dispatch(updateCategoryByID({id: res as string, category: this.categoryForm.value as Category}))
      })
      this.categoryForm.markAsPristine();
      this.openSnackBar('Updated!')
    }
  }

  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
      panelClass: ['snackBar']
    });
  }

}
