# Open Telemetry with NestJS

## Description

NestJS 에서 OpenTelemetry 를 사용하는 예제 코드를 담고 있다.

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Study

### Auto Instrumentation

`ppnm start` 로 앱을 실행시켜보면, auto intrumentation 이 되어있는 것을 확인할 수 있다.
아래와 같은 출력의 로그가 터미널에 출력된다.

새로운 터미널 창을 열어 다음 명령어를 실행시킨다.

```bash
$ curl localhost:3000
```

```
{
  resource: {
    attributes: {
      'service.name': 'unknown_service:node',
      'telemetry.sdk.language': 'nodejs',
      'telemetry.sdk.name': 'opentelemetry',
      'telemetry.sdk.version': '1.26.0',
      'process.pid': 18403,
      'process.executable.name': 'node',
      'process.executable.path': '/Users/woojin/.nvm/versions/node/v18.17.0/bin/node',
      'process.command_args': [
        '/Users/woojin/.nvm/versions/node/v18.17.0/bin/node',
        '--enable-source-maps',
        '/Users/woojin/Development/nestjs-open-telemetry/dist/main'
      ],
      'process.runtime.version': '18.17.0',
      'process.runtime.name': 'nodejs',
      'process.runtime.description': 'Node.js',
      'process.command': '/Users/woojin/Development/nestjs-open-telemetry/dist/main',
      'process.owner': 'woojin',
      'host.name': 'jumpclouds-MacBook-Pro-3.local',
      'host.arch': 'arm64'
    }
  },
  instrumentationScope: {
    name: '@opentelemetry/instrumentation-http',
    version: '0.53.0',
    schemaUrl: undefined
  },
  traceId: '83d5f46705732100caf19098a92b9ecd',
  parentId: undefined,
  traceState: undefined,
  name: 'GET /',
  id: 'b6d9547a0696b138',
  kind: 1,
  timestamp: 1727623164369000,
  duration: 7517,
  attributes: {
    'http.url': 'http://localhost:3000/',
    'http.host': 'localhost:3000',
    'net.host.name': 'localhost',
    'http.method': 'GET',
    'http.scheme': 'http',
    'http.target': '/',
    'http.user_agent': 'curl/8.6.0',
    'http.flavor': '1.1',
    'net.transport': 'ip_tcp',
    'net.host.ip': '::1',
    'net.host.port': 3000,
    'net.peer.ip': '::1',
    'net.peer.port': 60844,
    'http.status_code': 200,
    'http.status_text': 'OK',
    'http.route': '/'
  },
  status: { code: 0 },
  events: [],
  links: []
}
```

여러 필드가 있지만 그 중 특기할 만한 필드들을 몇 개 살펴보자.
`traceId` 가 자동으로 생성되어 할당되어 있다.
span 용으로 사용될 것이라 추측되는 `parentId` 는 할당되어 있지 않다. 아마 root span 으로 간주될 것으로 보인다.
`name` 은 현재 span 의 이름이다. 여기서는 `GET /` 이다. http 등의 모듈을 자동으로 hooking 해서 span 을 생성하고 있다.
`attributes` 에 여러 필드들이 있는데, 이는 span 에 대한 정보를 담고 있다. 여기서는 http 요청에 대한 정보가 담겨있다.
