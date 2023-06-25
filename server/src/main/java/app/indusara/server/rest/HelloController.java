package app.indusara.server.rest;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping()
public class HelloController {
    @GetMapping("/admin/hello")
    public String sayHello() {
        return "Hello";
    }
}
