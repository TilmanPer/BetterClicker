import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { ShopComponent } from './game/shop/shop.component';
import { StatsComponent } from './game/stats/stats.component';
import { ShopItemComponent } from './game/shop/shop-item/shop-item.component';
import { ComboComponent } from './game/combo/combo.component';
import { PopupComponent } from './popup/popup.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    ShopComponent,
    StatsComponent,
    ShopItemComponent,
    ComboComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
