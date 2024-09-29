import { NodeSDK } from '@opentelemetry/sdk-node';
import { InMemorySpanExporter } from "@opentelemetry/sdk-trace-node";
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import {
  ConsoleLogRecordExporter,
  LoggerProvider,
  SimpleLogRecordProcessor
} from "@opentelemetry/sdk-logs";
import { logs } from "@opentelemetry/api-logs";

const loggerProvider = new LoggerProvider()
loggerProvider.addLogRecordProcessor(
  new SimpleLogRecordProcessor(new ConsoleLogRecordExporter())
)

logs.setGlobalLoggerProvider(loggerProvider)

const sdk = new NodeSDK({
  traceExporter: new InMemorySpanExporter(),
  // NOTE: 현재 프로젝트의 실험 범위에서 metric 관련 Exporting 은 대상이 아니어서 주석 처리
  // metricReader: new PeriodicExportingMetricReader({
  //   exporter: new ConsoleMetricExporter(),
  // }),
  instrumentations: [getNodeAutoInstrumentations()],
});
sdk.start();
