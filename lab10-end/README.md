## Lab 10 - Server deployment

### Server deployment

Da bismo postavili web aplikaciju na neki server, potrebno je uraditi nekoliko stvari:

1. Otvaranje SSH konekcije ka serveru kako bismo proverili da li imamo sve što nam je potrebno (za osnovne funkcionalnosti treba nam MySQL baza i Java).
2. Build i pakovanje aplikacije u JAR (ili WAR) fajl.
3. Korišćenje SCP za kopiranje JAR fajla na server.
4. Pokretanje web aplikacije na serveru (uz opciono prvobitno gašenje prethodne verzije aplikacije).

**Napomena:** Vodite računa da su ovo samo smernice, jer se serversko okruženje na koje radite deploy može znatno razlikovati od onog što je prikazano ovde.


#### Otvaranje SSH konekcije ka serveru

Serveri su uglavnom Linux mašine kojima je moguće pristupiti preko tzv. secure shell, odnosno SSH konekcije.
Mi ćemo koristiti demo server, Linux Ubuntu, dostupan na **puskin.4expand.com**, port **12622** (inače je default 22), korisnik **kursista**, lozinka **stigoperadonolinux**.

**Windows:**

* Skinuti program [Putty](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html).
* Pokrenuti Putty i uneti u odgovarajuća polja URL i port servera na koji se konektujemo.
* Nakon otvaranja konekcije prvo ime korisnika, pa zatim lozinku.

**Linux:**

* Ima ugrađenu SSH komandu.
* Otvoriti terminal i uneti komandu:

```
ssh kursista@puskin.4expand.com -p 12622
```

* Nakon otvaranja konekcije uneti lozinku.

**Nastavak za oba OS:**

* Uneti komandu za konektovanje na bazu (korisnik **root**, password **root**):

```
mysql -u root -p
```

* Ako je MySQL baza instalirana, konekcija na bazu bi trebala biti uspešna. Ukoliko MySQL baza nije instalirana, instalirati je (instalacija može biti različita u zavisnosti od samog sistema servera).

* Napraviti **jwd11** bazu podataka, ukoliko već ne postoji -> ```show databases;```, ```create database jwd11;```.

* Sa ```exit``` komandom izaći iz MySQL konzole.

* Uneti komandu za proveru da li je instalirana Java:

```
java -version
```

* Ako je Java instalirana, trebalo bi da se ispiše njena verzija. Ukoliko Java nije instalirana, instalirati je (instalacija može biti različita u zavisnosti od samog sistema servera).

---

#### Pakovanje aplikacije u JAR fajl

* Pre deployment-a, proverite parametre za konekciju na bazu u ```application.properties``` fajlu (moraju odgovarati parametrima konekcije na MySQL na samom serveru).

* Pre pakovanja aplikacije, izmeniti <packaging> bude jar (self-executable varijanta, sa Tomcat-om). Takođe izmeniti <build> sekciju u ```pom.xml```. Obratite pažnju na <finalName> i <resources> deo:

```
<build>
		<finalName>wafepa</finalName>
		<resources>
			<resource>
				<directory>${basedir}/src/main/webapp</directory>
 				<targetPath>${basedir}/src/main/resources/META-INF/resources</targetPath>
				<includes>
					<include>**/**</include>
				</includes>
			</resource>
			<resource>
				<directory>${basedir}/src/main/resources</directory>
 				<includes>
					<include>**/**</include>
				</includes>
			</resource>
		</resources>
		<plugins>
			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
			</plugin>
			<plugin>
				<groupId>org.apache.maven.plugins</groupId>
				<artifactId>maven-surefire-plugin</artifactId>
				<configuration>
					<useSystemClassLoader>false</useSystemClassLoader>
				</configuration>
			</plugin>
		</plugins>
	</build>
```

* Build-ovati i zapakovati aplikaciju. Otvoriti terminal u korenskom direktorijumu projekta i uneti komandu:

```
mvn clean && mvn package
```

* Otvorite **target** direktorijum i videćete wafepa.jar fajl.

---

#### Postavljanje aplikacije na server

Kako bismo postavili aplikaciju na server, moramo iskopirati prethodno napravljeni JAR fajl na serversku mašinu.
Kopiranje se vrši secure copy (SCP) komandom.

**Napomena:** Pre samog kopiranja poželjno je dati JAR fajlu neku vrstu verzije (npr wafepa-1.0.jar), kako bismo imali dostupne i prethodne verzije aplikacije, za svaki slučaj ako deploy ne prođe kako treba.

**Windows:**

* Skinuti program [WinSCP](https://winscp.net/eng/download.php)
* Otvoriti WinSCP i uneti parametre za konekciju na server (parametri su isti kao za SSH).
* Iskopirati aplikaciju (JAR fajl) na server.


**Linux:**

* Ima ugrađenu SCP komandu.
* Uneti komandu za kopiranje (odlični primeri dostupni na [http://www.hypexr.org/linux_scp_help.php](http://www.hypexr.org/linux_scp_help.php)):

```
scp -P 12622 /{apsolutna_putanja_do_projekta}/target/wafepa.jar kursista@puskin.4expand.com:/home/kursista/wafepa
```

---


#### Pokretanje aplikacije

* Otvoriti SSH konekciju na server.
* Navigirati se u folder gde se nalazi naša web aplikaciju (u vidu self-executable JAR fajla).
* Pokrenuti aplikaciju izvršavanjem komande:

```
java -jar wafepa.jar
```

* Ukoliko se desila greška prilikom pokretanja aplikacije, proveriti da li je prethodna verzija aplikacije već pokrenuta - što onemogućava novoj verziji aplikacije da zauzme port 8080.
Ovu proveru možete izvršiti komandom ```ps -ef``` i ukoliko se u listi procesa već nalazi proces ```java -jar wafepa.jar```, zabeležiti njegov ID i ubiti taj proces komandom ```kill {id_procesa}```.

* Ukoliko je pokretanje prošlo OK, u browseru otići na [puskin.4expand.com:12688](puskin.4expand.com:12688). Na normalnom serveru aplikacije se neće nalaziti na 12688 portu, već na portu 80,
ali je na našem demo serveru port 80 zaključan iz sigurnosnih razloga.