package app.indusara.server.rest;

import app.indusara.server.entity.TestEntity;
import app.indusara.server.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class HelloController {
    private final TestService service;

    @Autowired
    public HelloController(TestService service) {
        this.service = service;
    }

    @GetMapping("/hello")
    public String sayHello() {
        service.saveTest(new TestEntity("Hello"));
        return service.getNameById(1);
    }

    @GetMapping("/db")
    public String testDB() {

        return service.getNameById(1);
    }
}
