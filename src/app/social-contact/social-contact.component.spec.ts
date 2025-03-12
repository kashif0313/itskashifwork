import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialContactComponent } from './social-contact.component';

describe('SocialContactComponent', () => {
  let component: SocialContactComponent;
  let fixture: ComponentFixture<SocialContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SocialContactComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
