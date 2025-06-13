import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

const typeOrmModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    return {
      type: 'postgres',
      host: configService.getOrThrow<string>('PG_HOST'),
      port: parseInt(configService.getOrThrow<string>('PG_PORT')),
      username: configService.getOrThrow<string>('PG_USERNAME'),
      password: configService.getOrThrow<string>('PG_PASSWORD'),
      database: configService.getOrThrow<string>('PG_DATABASE'),
      autoLoadEntities: true,
      synchronize: true,
      logging: configService.get<string>('NODE_ENV') !== 'production',
      // Azure PostgreSQL Flexible Server requires SSL connections by default.
      // To connect to the server, you need to set the `ssl` option to `true` and provide the `rejectUnauthorized` option.
      // The `rejectUnauthorized` option is set to `false` to allow self-signed certificates.

      ...(configService.get<string>('NODE_ENV') === 'production' && {
        ssl: configService.get<boolean>('PG_SSL'),
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
      }),
    };
  },
});

@Module({
  imports: [ConfigModule, typeOrmModule],
  providers: [],
  exports: [typeOrmModule],
})
export class DatabaseModule {}
