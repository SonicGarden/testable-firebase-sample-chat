import { RulesTestEnvironment } from '@firebase/rules-unit-testing';
import { getTestEnv, setCollection } from '@/../test/utils';

const getFirestoreMock = vi.fn();
vi.mock('firebase/firestore', async () => {
  const firestore = await vi.importActual<object>('firebase/firestore');
  return { ...firestore, getFirestore: getFirestoreMock };
});

export const messagesQueries = () => {
  describe('messagesQueries', () => {
    describe('messagesQuery', () => {
      let env: RulesTestEnvironment;

      beforeEach(async () => {
        env = getTestEnv();
        getFirestoreMock.mockReturnValue(env.authenticatedContext('uid').firestore());
        await env.withSecurityRulesDisabled(async (context) => {
          const adminDb = context.firestore();
          const { Timestamp } = await import('firebase/firestore');
          const { messageFactory } = await import('@/../test/factories/message');
          const message1 = messageFactory.build({
            id: 'message-id-1',
            content: '1番目のメッセージ',
            createdAt: Timestamp.fromDate(new Date('2022-08-01T00:00:00')),
          });
          const message2 = messageFactory.build({
            id: 'message-id-2',
            content: '2番目のメッセージ',
            createdAt: Timestamp.fromDate(new Date('2022-08-01T00:00:01')),
          });
          const message3 = messageFactory.build({
            id: 'message-id-3',
            content: '3番目のメッセージ',
            createdAt: Timestamp.fromDate(new Date('2022-08-01T00:00:02')),
          });
          const messages = [message1, message2, message3];
          await setCollection(adminDb.collection('messages'), messages);
        });
      });

      it('createdAtの昇順にソートされたメッセージが取得できる', async () => {
        const { getDocs } = await import('firebase/firestore');
        const { messagesQuery } = await import('@/lib/message');
        const snapshot = await getDocs(messagesQuery);
        expect(snapshot.size).toEqual(3);
        expect(snapshot.docs.map((doc) => doc.data().content)).toEqual([
          '1番目のメッセージ',
          '2番目のメッセージ',
          '3番目のメッセージ',
        ]);
      });
    });
  });
};
