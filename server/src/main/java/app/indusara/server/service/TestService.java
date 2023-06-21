package app.indusara.server.service;

import app.indusara.server.dao.TestDAO;
import app.indusara.server.entity.TestEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TestService {
    private final TestDAO testdao;

    @Autowired
    public TestService(TestDAO testdao) {
        this.testdao = testdao;
    }

    public void saveTest(TestEntity test) {
        testdao.save(test);
    }

    public String getNameById(Integer id) {
        Optional<TestEntity> entity = testdao.findById(id);
        return entity.isPresent() ? entity.get().getName() : "NOT FOUND";
    }

}
