import { NodeSDK } from '@opentelemetry/sdk-node';
import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import {
  ConsoleMetricExporter,
  PeriodicExportingMetricReader,
} from '@opentelemetry/sdk-metrics';
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import {
  ConsoleLogRecordExporter,
  LoggerProvider,
  SimpleLogRecordProcessor
} from "@opentelemetry/sdk-logs";
import { logs } from "@opentelemetry/api-logs";

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

const loggerProvider = new LoggerProvider()
loggerProvider.addLogRecordProcessor(
  new SimpleLogRecordProcessor(new ConsoleLogRecordExporter())
)

logs.setGlobalLoggerProvider(loggerProvider)

const sdk = new NodeSDK({
  traceExporter: new ConsoleSpanExporter(),
  // NOTE: 현재 프로젝트의 실험 범위에서 metric 관련 Exporting 은 대상이 아니어서 주석 처리
  // metricReader: new PeriodicExportingMetricReader({
  //   exporter: new ConsoleMetricExporter(),
  // }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
