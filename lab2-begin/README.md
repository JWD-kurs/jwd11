## Lab 2 - REST, Spring Boot, Dependency injection

### REST

----

REST web servis (često nazivan i REST Web API) je web servis implementiran korišćenjem HTTP protokola i REST (*Representation State Transfer*) principa - [What is REST](http://martinfowler.com/articles/richardsonMaturityModel.html).
REST web servis predstavlja kolekciju **resursa**. Resursima manipulišemo korišćenjem [metoda](http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html) koje definiše HTTP protokol:

- GET
- POST
- PUT
- DELETE

Korišćenjem ovih metoda API (web servis) se dizajnira tako da je za svaki entitet (resurs)
potreban samo njegov URL za vršenje CRUD operacija preko različitih HTTP metoda:
- ako se traži kolekcija resursa: /activities
- ako se traži konkretan resurs: /activities/{id}, gde id predstavlja identifikator resursa

| Resurs                                      | GET                                                                           | PUT                                                                | POST                                                                                                      | DELETE                 |
|---------------------------------------------|-------------------------------------------------------------------------------|--------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|------------------------|
| Kolekcija http://example.com/resources      | Listaj URI-je i eventualno druge detalja o svim članovima kolekcije.          | Zameni celu kolekciju drugom kolekcijom.                           | Dodaj novog člana kolekcije. URI ovog člana se obično generiše automatski i vraća kao rezultat operacije. | Obriši celu kolekciju. |
| Element http://example.com/resources/item17 | Dobavi traženi element kolekcije u obliku koji je naveden u header-u zahteva. | Zameni navedeni član kolekcije, a ukoliko ne postoji kreiraj novi. | Obično se ne koristi.                                                                                     |Obriši element         |

![REST API](http://46.4.82.177/kursimages/rest_api.svg)

----


### Spring Boot

[Spring Boot](http://projects.spring.io/spring-boot/) se koristi kako bi se pojednostavila konfiguracija Spring projekata. Umesto XML konfiguracionih fajlova, koriste se anotacije u Java klasama. Takođe, na osnovu biblioteka raspoloživih na class path-u, Spring Boot automatski postavlja podrazumevanu konfiguraciju za svaku od njih. Ova konfiguracija se po potrebi može menjati. 

* Obratiti pažnju na izmenjen sadržaj `pom.xml`
* Napraviti klasu WafepaApplication u kojoj će se nalaziti početna Spring Boot konfiguracija. Klasa treba da nasledi `SpringBootServletInitializer`
* Anotirati klasu kao `@SpringBootApplication`
* Dodati ovoj kalsi main metodu
```java
	public static void main(String[] args) throws Exception {
		SpringApplication.run(Wafepa.class, args);
	}
```
* **Pokrenuti klasu kao običnu Java aplikaciju**



### Servisi i kontroleri

![Spring REST](http://46.4.82.177/kursimages/spring_rest.svg)

* Napraviti paket `jwd.wafepa.web.controller`
* Napraviti klasu `ApiActivityController` u paketu `jwts.wafepa.web.controller`
* Mapirati je na URL `api/activities` korišćenjem `@RequestMapping` anotacije

---------------------------------------
* [Dependency Injection](http://igordejanovic.net/courses/tech/DependencyInjection.html#/) je softverski obrazac koji se koristi kako bi se olakšalo instanciranje objekata. Postoje mnoge implementacije koje se mogu koristiti nezavisno od Spring-a. U okviru Spring Framework-a, DI se koristi kako bi se dobila referenca na neku komponentu
* Da bi Spring Dependency Injecion radio, potrebno je uključiti component-scan mehanizam. U Spring Boot, ovo podešavanje je deo anotacije `@SpringBootApplication` koju smo već primenili. 

* Anotirati `InMemoryActivityService` kao `@Service`

* Anotirati klasu `ApiActivityController` sa `@RestController`
* Injektovati `ActivityService` u `ApiActivityController` korišćenjem `@Autowired` anotacije

---------------------------------------


* Kako bi se podaci (objekti) koje vraća/prihvata REST web servis serijalizovali u JSON objekte,
potrebno je dodati dependency za Jackson mapper (koji mapira Java objekte na JSON, i obrnuto):

```xml
<!-- JSON -->
<dependency>
	<groupId>org.codehaus.jackson</groupId>
	<artifactId>jackson-mapper-asl</artifactId>
	<version>1.9.13</version>
</dependency>
<dependency>
	<groupId>org.codehaus.jackson</groupId>
	<artifactId>jackson-core-asl</artifactId>
	<version>1.9.13</version>
</dependency>
<dependency>
	<groupId>org.codehaus.jackson</groupId>
	<artifactId>jackson-jaxrs</artifactId>
	<version>1.9.13</version>
</dependency>
```

* Implementirati CRUD operacije za aktivnosti prateći REST princip.
* Testirati napravljeni REST web servis (koristiti plug-in RESTClient).

---------------------------------------
### Domaći zadatak
Po uzoru na aktivnosti, dodati mogućnost evidencije korisnika:

1. Dodati model klasu User (id, email, password, first name, last name)
2. Dodati servisni sloj za korisnike (interfejs i in-memory implementacija), kao i testove za servisni sloj
3. Dodati ApiUserController klasu za korisnike (/api/users)

Lektira: [What is REST](http://martinfowler.com/articles/richardsonMaturityModel.html)