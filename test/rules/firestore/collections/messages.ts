import { assertSucceeds, assertFails, RulesTestEnvironment } from '@firebase/rules-unit-testing';
import firebase from 'firebase/compat/app';
import { getTestEnv, setCollection } from '@/../test/utils';
import { userFactory } from '@/../test/factories/user';
import { messageFactory } from '@/../test/factories/message';

const user = userFactory.build({ id: 'user-id' });
const other = userFactory.build({ id: 'other-id' });
const users = [user, other];
const userMessage = messageFactory.build({ id: 'user-message-id', senderId: user.id });
const otherMessage = messageFactory.build({ id: 'other-message-id', senderId: other.id });
const messages = [userMessage, otherMessage];

export const messagesTest = () => {
  describe('messages', () => {
    let env: RulesTestEnvironment;

    beforeEach(async () => {
      env = getTestEnv();
      await env.withSecurityRulesDisabled(async (context) => {
        const adminDb = context.firestore();
        await setCollection(adminDb.collection('users'), users);
        await setCollection(adminDb.collection('messages'), messages);
      });
    });

    describe('未認証の場合', () => {
      let db: firebase.firestore.Firestore;

      beforeEach(() => {
        db = env.unauthenticatedContext().firestore();
      });

      it('読み込みできない(get)', async () => {
        const ref = db.collection('messages').doc(otherMessage.id);
        await assertFails(ref.get());
      });

      it('読み込みできない(list)', async () => {
        const ref = db.collection('messages');
        await assertFails(ref.get());
      });

      it('作成できない', async () => {
        const newMessage = messageFactory.build();
        const ref = db.collection('messages');
        await assertFails(ref.add(newMessage));
      });

      it('更新できない', async () => {
        const ref = db.collection('messages').doc(otherMessage.id);
        await assertFails(ref.update({ content: '違う内容' }));
      });

      it('削除できない', async () => {
        const ref = db.collection('messages').doc(otherMessage.id);
        await assertFails(ref.delete());
      });
    });

    describe('認証済の場合', () => {
      it('一覧を読み込みできる(list)', async () => {
        const db = env.authenticatedContext(user.id).firestore();
        const ref = db.collection('messages');
        await assertSucceeds(ref.get());
      });

      describe('自分のデータの場合', () => {
        let db: firebase.firestore.Firestore;

        beforeEach(() => {
          db = env.authenticatedContext(user.id).firestore();
        });

        it('読み込みできる(get)', async () => {
          const ref = db.collection('messages').doc(userMessage.id);
          await assertSucceeds(ref.get());
        });

        it('作成できる', async () => {
          const newMessage = messageFactory.build({ senderId: user.id });
          const ref = db.collection('messages');
          await assertSucceeds(ref.doc(newMessage.id).set(newMessage));
        });

        it('更新できる', async () => {
          const ref = db.collection('messages').doc(userMessage.id);
          await assertSucceeds(ref.update({ content: '違う内容' }));
        });

        it('削除できる', async () => {
          const ref = db.collection('messages').doc(userMessage.id);
          await assertSucceeds(ref.delete());
        });
      });

      describe('自分以外のデータの場合', () => {
        let db: firebase.firestore.Firestore;

        beforeEach(() => {
          db = env.authenticatedContext(user.id).firestore();
        });

        it('読み込みできる(get)', async () => {
          const ref = db.collection('messages').doc(otherMessage.id);
          await assertSucceeds(ref.get());
        });

        it('作成できない', async () => {
          const newMessage = messageFactory.build({ senderId: other.id });
          const ref = db.collection('messages');
          await assertFails(ref.doc(newMessage.id).set(newMessage));
        });

        it('更新できない', async () => {
          const ref = db.collection('messages').doc(otherMessage.id);
          await assertFails(ref.update({ content: '違う内容' }));
        });

        it('削除できない', async () => {
          const ref = db.collection('messages').doc(otherMessage.id);
          await assertFails(ref.delete());
        });
      });
    });
  });
};
