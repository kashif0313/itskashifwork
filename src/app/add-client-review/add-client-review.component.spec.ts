import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClientReviewComponent } from './add-client-review.component';

describe('AddClientReviewComponent', () => {
  let component: AddClientReviewComponent;
  let fixture: ComponentFixture<AddClientReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddClientReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddClientReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
