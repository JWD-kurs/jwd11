﻿## Lab 4 - ORM, Hibernate, Spring Data JPA

### ORM - Object-Relational Mapping

ORM predstavlja tehniku programiranja gde se objektni model korišćen u aplikaciji
mapira na relacioni model podataka u bazi podataka. Veoma korisna tehnika za
brz razvoj softvera (eng. rapid-software development), jer pravi
"virtuelnu objektnu bazu podataka" koja se može koristiti unutar izabranog programskog jezika.
Postoji veliki broj alata za ORM u modernim programskim jezicima, a jedan od
najpopularnijih je [Hibernate za Javu](http://hibernate.org/orm/).

----


### Hibernate

Pored svog API-ja, Hibernate takođe predstavlja implementaciju 
Java Persistance API (JPA) specifikacije. Samim tim, može se lako koristiti
u bilo kom okruženju koje podržava JPA, kao što su Java SE aplikacije,
Java EE aplikativni serveri, itd.

Hibernate omogućava razvoj perzistentnog modela korišćenjem idioma
objektno-orijentisanog programiranja, uključujući nasleđivanje, polimorfizme,
asocijaciju, kompoziciju, itd. Hibernate ne zahteva nikakve posebne interfejse ili
klase za perzistentne klase i time omogućava da bilo koja klasa ili struktura
podataka bude perzistentna.

----

* Izvršiti MySQL za pražnjenje baze podataka (jwd_x zameniti svojim nalogom):

```sql
DROP DATABASE IF EXISTS jwd_x;
CREATE DATABASE jwd_x DEFAULT CHARACTER SET utf8;

USE jwd_x;

GRANT ALL ON jwd_x.* TO 'jwd_x'@'%' IDENTIFIED BY 'jwd_x';

FLUSH PRIVILEGES;
```

NAPOMENA: Poslednje dve naredbe se neće izvršiti na serveru jer na njih nemate privilegije, ali ih možete izvršiti na svojim kućnim računarima. 

* Napraviti datoteku `src/main/resources/application.properties`

* Unutar `application.properties` datoteku dodati sledeća podešavanja:
 
```
# ===============================
# = DATA SOURCE
# ===============================
spring.datasource.url=jdbc:mysql://192.168.0.2:3306/jwd_x
spring.datasource.username=jwd_x
spring.datasource.password=jwd_x

# ===============================
# = JPA / HIBERNATE
# ===============================

# Prikazuj SQL upite koje JPA generiše
spring.jpa.show-sql = true

# Hibernate ddl-auto: 
#	validate: validate the schema, makes no changes to the database.
#	update: update the schema.
#	create: creates the schema, destroying previous data.
#	create-drop: drop the schema at the end of the session.

spring.jpa.hibernate.ddl-auto = update

# Allows Hibernate to generate SQL optimized for a particular DBMS
spring.jpa.properties.hibernate.dialect = org.hibernate.dialect.MySQL5Dialect

spring.jpa.properties.connection.CharSet=utf8
spring.jpa.properties.connection.characterEncoding=utf8
spring.jpa.properties.hibernate.connection.useUnicode=true

```

Umesto `jwd_x` navesti svoju bazu. Za vežbu kod kuće navesti `localhost` umesto `192.168.0.2`. 

* Dodati potrebne dependency-je u `pom.xml`:

```xml
<!-- DB related dependencies -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
```

* Anotirati klasu `Activity` sa `@Entity` i `@Table(name="tblActivity")`.

* Anotirati polje `id` klase `Activity` sa `@Id`, `@GeneratedValue` i `@Column(name="id")`.

* Anotirati polje `name` klase `Activity` sa `@Column(name="name")`.

* Pokrenuti aplikaciju i obratiti pažnju na promene u šemi baze podataka.

----

### Spring Data JPA

Spring Data JPA je deo velike familije projekata Spring Data
koji omogućava laku implementaciju repozitorijuma baziranih na JPA specifikaciji.
Sa Spring Data JPA je lakše praviti Spring aplikacije koje koriste tehnologije pristupa podacima.

Korišćenjem Spring Data JPA, developeri pišu svoje **interfejse** ka repozitorijumima,
zajedno sa *custom* metodama za pronalaženje podataka, dok Spring obezbeđuje **automatsku implementaciju**.

Prilikom pisanja *custom* metoda, potrebno je držati se
[specifikacije za davanje imena ovim metodama](http://docs.spring.io/spring-data/jpa/docs/1.2.0.RELEASE/reference/html/#jpa.query-methods).

----


* Napraviti paket `jwd.wafepa.repository` i u njemu napraviti interfejs `ActivityRepository`.
`ActivityRepository` treba da nasleđuje interfejs `JpaRepository`.
Anotirati interfejs `ActivityRepository` sa `@Repository`.

* U servisnom sloju dodati implementaciju interfejsa `ActivityService` koja će se zvati `JpaActivityService`.
Pomoću *Dependency Injection* mehanizma uključiti `ActivityRepository` u `JpaActivityService` (korišćenjem `@Autowired`) i implementirati metode servisa tako da koriste repozitorijum. Anotirati `JpaActivityService` sa `@Transactional`.

* Skloniti anotaciju `@Service` sa *in-memory* implementacije `ActivityService`-a, i dodati je na JPA implementaciju.

* Pokrenuti aplikaciju, uraditi CRUD operacije nad aktivnostima i posmatrati promene u bazi podataka.

----

#### *Custom* metode Spring Data JPA

* U `ActivityRepository` napraviti metodu `List<Activity> findByName(String name)`.
Anotirati ovu metodu sa JPQL (Java Persistance Query Language)
upitom `@Query("select a from Activity a where a.name = :name)`.
Anotirati parametar name sa `@Param("name")`.

* Ukloniti anotaciju `@Query` sa metode `findByName` u `ActivityRepository` i testirati pretraživanje po imenu.

----

### Zadatak

Napraviti u modelu klasu `Address` koja ima polja:
* `id` (`Long`)
* `street` (`String`)
* `number` (`String`)

Implementirati REST servis za ovu klasu.


----

### Domaći zadatak

1. Po uzoru na aktivnosti, napraviti ORM mapiranje za korisnike (klasa `User`) pomoću Hibernate.
2. Dodati JPA implementaciju repozitorijuma za korisnike.
3. Dodati mogućnost pretraživanja korisnika po e-mail-u i po imenu i prezimenu.

