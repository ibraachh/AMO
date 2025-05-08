# Этап сборки
FROM maven:3.9.4-eclipse-temurin-17 AS build

# Создаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем файл pom.xml и загружаем зависимости
COPY amoGroup/pom.xml ./amoGroup/
RUN mvn -f amoGroup/pom.xml dependency:go-offline

# Копируем остальной код проекта
COPY amoGroup ./amoGroup

# Собираем Spring Boot приложение (JAR)
RUN mvn -f amoGroup/pom.xml clean package -DskipTests

# Этап запуска
FROM eclipse-temurin:17-jdk

# Создаем рабочую директорию для финального контейнера
WORKDIR /app

# Копируем собранный JAR из предыдущего этапа
COPY --from=build /app/amoGroup/target/*.jar app.jar

# Открываем порт (Render сам подставит порт через переменную PORT)
EXPOSE 8080

# Запуск приложения
CMD ["java", "-jar", "app.jar"]
