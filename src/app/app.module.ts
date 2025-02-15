import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { initializeApp } from '@angular/fire/app';
import { getFirestore } from '@angular/fire/firestore';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

const firebaseConfig = {
 apiKey: "AIzaSyCNo7lWn25ljXnEg1dNLeWAFxL5uYVB3no",
  authDomain: "clean-environs.firebaseapp.com",
  projectId: "clean-environs",
  storageBucket: "clean-environs.firebasestorage.app",
  messagingSenderId: "79024030980",
  appId: "1:79024030980:web:067e7611be2dc629ba7c51",
  measurementId: "G-X0GEJL2D8W"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
