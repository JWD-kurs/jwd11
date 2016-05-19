## Lab 8 - Bootstrap, Forme


### Bootstrap

Bootstrap predstavlja biblioteku CSS (CSS3) klasa, kao i pomoćnih JavaScript funkcija.
Kompatibilan je isključivo sa HTML5 dokumentima. Baziran je na tzv. "responsive design" principu,
i omogućava lako prilagođavanje web aplikacije mobilnim uređajima (tablet, smartphone, ...).

Veoma je dobro dokumentovan, sa velikim brojem primera korišćenja. Bootstrap se može preuzeti na ovom [http://getbootstrap.com/](http://getbootstrap.com/).

----

* Downloadovati Bootstrap CSS i importovati u projekat.

* Iskoristiti neki od Bootstrap primera kao šablon za WAFEAPA web aplikaciju. Primeri na [http://getbootstrap.com/getting-started/#examples](http://getbootstrap.com/getting-started/#examples).

* Iskoristiti Bootstrap stilove za tabele na stranici za prikaz aktivnosti.

* Iskoristiti Bootstrap stilove za forme na stranici za prikaz dodavanje/izmenu aktivnosti.

* Ubaciti "loading spinner" koji se prikazuje dok se aktivnosti učitavaju sa servera.

Potreban CSS kod:

```css
.glyphicon-refresh-animate {
    -animation: spin .7s infinite linear;
    -ms-animation: spin .7s infinite linear;
    -webkit-animation: spinw .7s infinite linear;
    -moz-animation: spinm .7s infinite linear;
}
 
@keyframes spin {
    from { transform: scale(1) rotate(0deg);}
    to { transform: scale(1) rotate(360deg);}
}
  
@-webkit-keyframes spinw {
    from { -webkit-transform: rotate(0deg);}
    to { -webkit-transform: rotate(360deg);}
}
 
@-moz-keyframes spinm {
    from { -moz-transform: rotate(0deg);}
    to { -moz-transform: rotate(360deg);}
}
```

### Domaći zadatak

1. Eksperimentisati sa Bootstrap CSS i komponentama
2. Pogledati alternativu za Bootstrap, a to je Material design (by Google) - [http://materializecss.com/](http://materializecss.com/)
3. Napraviti da je alert sa porukom greške na stranici za prikaz aktivnosti "dissmissable", tj. da može da se ugasi.
4. Na stranici za prikaz svih aktivnosti pored naslova stranica ispisati ukupan broj aktivnosti (iskoristiti Bootstrap badges).
5. Na stranici za dodavanje aktivnosti naslov da bude samo "Add activity".
5. Na stranici za izmenu aktivnosti naslov da bude samo "Edit activity".