package studio.farsighted.pfe.api.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityScheme;

@OpenAPIDefinition(
        info = @io.swagger.v3.oas.annotations.info.Info(
                title = "EY Assessment Api Definition",
                description = "This is the API definition for the EY Assessment API.",
                version = "1.0"
        ),
        servers = {
                @io.swagger.v3.oas.annotations.servers.Server(
                        url = "http://localhost:8080",
                        description = "Local Dev Server"
                )
        },
        security = {
                @io.swagger.v3.oas.annotations.security.SecurityRequirement(
                        name = "bearer"
                )
        }
)
@SecurityScheme(
        scheme = "bearer",
        name = "Bearer Authentication",
        type = SecuritySchemeType.HTTP,
        description = "JWT authentication using Bearer token",
        bearerFormat = "JWT",
        in = SecuritySchemeIn.HEADER
)
public class OpenApiConfiguration {
}
