FROM maven:3.8.6-openjdk-18-slim AS build
WORKDIR /home/app

COPY src src
COPY pom.xml .
RUN mvn -f /home/app/pom.xml clean package

FROM openjdk:17-jdk-alpine
COPY --from=build /home/app/target/server-0.0.1-SNAPSHOT.jar /usr/local/lib/app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/usr/local/lib/app.jar"]