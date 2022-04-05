import { ConsoleSpanExporter, BatchSpanProcessor } from '@opentelemetry/tracing';
import { NodeTracerProvider } from '@opentelemetry/node';
import { AsyncHooksContextManager } from '@opentelemetry/context-async-hooks';
import { GraphQLInstrumentation } from '@opentelemetry/instrumentation-graphql';
import { Resource } from '@opentelemetry/resources';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import { W3CTraceContextPropagator } from '@opentelemetry/core';
import { useTracing } from '../constants/useTracing';

if (useTracing) {
  const provider = new NodeTracerProvider({
    resource: new Resource({
      'service.name': 'manager-app-backend',
      'service.version': 'dev'
    })
  });

  const graphQLInstrumentation = new GraphQLInstrumentation();
  graphQLInstrumentation.setTracerProvider(provider);
  graphQLInstrumentation.enable();
  
  provider.addSpanProcessor(
    new BatchSpanProcessor(new ConsoleSpanExporter())
  );

  provider.addSpanProcessor(
    new BatchSpanProcessor(
      new JaegerExporter({
        host: 'http://localhost/api/traces',
        port: 14268
      })
    )
  );

  provider.register({
    contextManager: new AsyncHooksContextManager().enable(),
    propagator: new W3CTraceContextPropagator()
  });
}

