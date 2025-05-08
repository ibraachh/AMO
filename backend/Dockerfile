# Этап сборки
FROM maven:3.9.4-eclipse-temurin-17 AS build

# Рабочая директория внутри контейнера
WORKDIR /app

# Копируем pom.xml и загружаем зависимости
COPY backend/amoGroup/pom.xml ./amoGroup/
RUN mvn -f amoGroup/pom.xml dependency:go-offline

# Копируем весь проект
COPY backend/amoGroup ./amoGroup

# Собираем Spring Boot приложение
RUN mvn -f amoGroup/pom.xml clean package -DskipTests

# Этап запуска
FROM eclipse-temurin:17-jdk

WORKDIR /app

# Копируем собранный JAR-файл из предыдущего этапа
COPY --from=build /app/amoGroup/target/*.jar app.jar

# Открываем порт
EXPOSE 8080

# Запускаем Spring Boot приложение
CMD ["java", "-jar", "app.jar"]
