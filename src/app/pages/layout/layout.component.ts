import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar.component';
import { Footer } from '../../components/footer/footer.component';
import { ToastContainer } from '../../components/toast-container/toast-container.component';

@Component({
  selector: 'layout',
  imports: [RouterOutlet, Navbar, Footer, ToastContainer],
  templateUrl: './layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Layout {}
