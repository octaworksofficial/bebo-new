import { desc } from 'drizzle-orm';

import { db } from '@/libs/DB';
import { paymentLogsSchema } from '@/models/Schema';

async function main() {
  try {
    console.log('Fetching last 5 payment logs...');
    const logs = await db
      .select()
      .from(paymentLogsSchema)
      .orderBy(desc(paymentLogsSchema.createdAt))
      .limit(5);

    if (logs.length === 0) {
      console.log('No logs found.');
      return;
    }

    logs.forEach((log: any) => {
      console.log('------------------------------------------------');
      console.log(`ID: ${log.id}`);
      console.log(`OID: ${log.merchantOid}`);
      console.log(`Status (DB): ${log.status}`);
      console.log(`Payment Type: ${log.paymentType}`);
      console.log(`Failed Reason Code: ${log.failedReasonCode}`);
      console.log(`Failed Reason Msg: ${log.failedReasonMsg}`);
      console.log(`CreatedAt: ${log.createdAt}`);
      try {
        const raw = JSON.parse(log.rawPayload || '{}');
        console.log('RAW STATUS:', raw.status);
      } catch (e) {
        console.log('RAW Payload parsing failed');
      }
    });
  } catch (error) {
    console.error('Error fetching logs:', error);
  }
}

main();
