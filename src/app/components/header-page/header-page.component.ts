import {Component, OnInit} from '@angular/core';
import {loadCategory, loadDishesByCategory, loadInfo} from "../../store/app/app.actions";
import {select, Store} from "@ngrx/store";
import {categories, info, selectDishes} from "../../store/app/app.selectors";
import {FormControl, FormGroup} from "@angular/forms";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-header-page',
  templateUrl: './header-page.component.html',
  styleUrls: ['./header-page.component.css']
})


export class HeaderPageComponent implements OnInit {

  categories = this.store.pipe(select(categories))
  dishes = this.store.pipe(select(selectDishes))
  info = this.store.pipe(select(info), tap(([el]) => {
    this.infoForm.patchValue(el)
  }))

  isManager = false


  infoForm: FormGroup = new FormGroup({
    address: new FormControl(''),
    phone: new FormControl(''),
    wifi: new FormControl(''),
  })



  constructor(
    private store: Store<any>
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadCategory())
    this.store.dispatch(loadInfo())
    this.infoForm.patchValue(this.info)
  }

  onSelectCategory(id: string) {
    this.store.dispatch(loadDishesByCategory({category: id}))
  }

  updateInfo() {
    const isExist = !!this.infoForm.value.length
    console.log(this.infoForm)
    console.log(isExist)
    // this.store.dispatch(updateInfo({isExist: isExist, info: this.infoForm.value as Info}))
  }
}
