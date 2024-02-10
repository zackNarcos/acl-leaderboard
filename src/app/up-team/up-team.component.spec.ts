import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpTeamComponent } from './up-team.component';

describe('UserProfileComponent', () => {
  let component: UpTeamComponent;
  let fixture: ComponentFixture<UpTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
