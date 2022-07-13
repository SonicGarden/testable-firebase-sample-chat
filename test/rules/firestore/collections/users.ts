import { describe, it, beforeEach } from 'vitest';
import { assertSucceeds, assertFails, RulesTestEnvironment } from '@firebase/rules-unit-testing';
import firebase from 'firebase/compat/app';
import { getTestEnv, setCollection } from '@/../test/rules/firestore/utils';
import { userFactory } from '@/../test/factories/user';

const user = userFactory.build({ id: 'user-id' });
const other = userFactory.build({ id: 'other-id' });
const users = [user, other];

export const usersTest = () => {
  let env: RulesTestEnvironment;

  beforeEach(async () => {
    env = getTestEnv();
    await env.withSecurityRulesDisabled(async (context) => {
      const adminDb = context.firestore();
      await setCollection(adminDb.collection('users'), users);
    });
  });

  describe('未認証の場合', () => {
    let db: firebase.firestore.Firestore;

    beforeEach(() => {
      db = env.unauthenticatedContext().firestore();
    });

    it('読み込みできない(get)', async () => {
      const ref = db.collection('users').doc(other.id);
      await assertFails(ref.get());
    });

    it('読み込みできない(list)', async () => {
      const ref = db.collection('users');
      await assertFails(ref.get());
    });

    it('作成できない', async () => {
      const newUser = userFactory.build();
      const ref = db.collection('users');
      await assertFails(ref.add(newUser));
    });

    it('更新できない', async () => {
      const ref = db.collection('users').doc(other.id);
      await assertFails(ref.update({ name: '違う名前' }));
    });

    it('削除できない', async () => {
      const ref = db.collection('users').doc(other.id);
      await assertFails(ref.delete());
    });
  });

  describe('認証済の場合', () => {
    it('一覧を読み込みできる(list)', async () => {
      const db = env.authenticatedContext(user.id).firestore();
      const ref = db.collection('users');
      await assertSucceeds(ref.get());
    });

    describe('自分のデータの場合', () => {
      let db: firebase.firestore.Firestore;

      beforeEach(() => {
        db = env.authenticatedContext(user.id).firestore();
      });

      it('読み込みできる(get)', async () => {
        const ref = db.collection('users').doc(user.id);
        await assertSucceeds(ref.get());
      });

      it('作成できる', async () => {
        const newUser = userFactory.build();
        const db = env.authenticatedContext(newUser.id).firestore();
        const ref = db.collection('users');
        await assertSucceeds(ref.doc(newUser.id).set(newUser));
      });

      it('更新できる', async () => {
        const ref = db.collection('users').doc(user.id);
        await assertSucceeds(ref.update({ name: '違う名前' }));
      });

      it('削除できる', async () => {
        const ref = db.collection('users').doc(user.id);
        await assertSucceeds(ref.delete());
      });
    });

    describe('自分以外のデータの場合', () => {
      let db: firebase.firestore.Firestore;

      beforeEach(() => {
        db = env.authenticatedContext(user.id).firestore();
      });

      it('読み込みできる(get)', async () => {
        const ref = db.collection('users').doc(other.id);
        await assertSucceeds(ref.get());
      });

      it('作成できない', async () => {
        const newUser = userFactory.build();
        const ref = db.collection('users');
        await assertFails(ref.doc(newUser.id).set(newUser));
      });

      it('更新できない', async () => {
        const ref = db.collection('users').doc(other.id);
        await assertFails(ref.update({ name: '違う名前' }));
      });

      it('削除できない', async () => {
        const ref = db.collection('users').doc(other.id);
        await assertFails(ref.delete());
      });
    });
  });
};
