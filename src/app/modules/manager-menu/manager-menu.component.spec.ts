import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ManagerMenuComponent} from './manager-menu.component';
import {provideMockStore} from "@ngrx/store/testing";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {provideMockActions} from "@ngrx/effects/testing";
import {ReplaySubject} from "rxjs";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";

class MatDialogMock{
  open(){}
  close(){}
}

class MatSnackBarMock{
  open(){}
}

describe('ManagerMenuComponent', () => {
  let component: ManagerMenuComponent;
  let fixture: ComponentFixture<ManagerMenuComponent>;
  let actions: ReplaySubject<any> = new ReplaySubject<any>(1)
  let snackBar: any

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ManagerMenuComponent],
      providers: [
        provideMockStore({initialState: {}}),
        provideMockActions(() => actions),
        {provide: MatDialog, useClass: MatDialogMock},
        {provide: MatSnackBar, useClass: MatSnackBarMock}
      ],
      schemas:[
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents()

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerMenuComponent)
    snackBar = TestBed.get(MatSnackBar)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
  expect(component).toBeTruthy()
  });

  it('should create form with 2 controls', () => {
    expect(component.categoryForm.contains('categoryName')).toBeTruthy();
    expect(component.categoryForm.contains('categoryAvailable')).toBeTruthy();
  });

  it('should open snackBar', () => {
    const spy = spyOn(snackBar, 'open')
    component.openSnackBar('test snackBar')
    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith('test snackBar', undefined,{
      duration: 4000,
      panelClass: ['snackBar']
    })
  });
});
