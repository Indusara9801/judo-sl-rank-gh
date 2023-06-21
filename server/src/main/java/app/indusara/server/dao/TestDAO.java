package app.indusara.server.dao;

import app.indusara.server.entity.TestEntity;
import org.springframework.data.jpa.repository.JpaRepository;



public interface TestDAO extends JpaRepository<TestEntity, Integer> {
}
