import firebaseFunctionsTest from 'firebase-functions-test';

const { wrap, firestore } = firebaseFunctionsTest();
const { makeDocumentSnapshot } = firestore;

const messagingSendMock = vi.fn();
vi.mock('firebase-admin', async () => {
  const admin = await vi.importActual<object>('firebase-admin');
  return {
    ...admin,
    messaging: vi.fn().mockReturnValue({ send: messagingSendMock }),
    initializeApp: vi.fn(),
    firestore: vi.fn().mockReturnValue({ settings: vi.fn() }),
  };
});
const getCollectionDataMock = vi.fn();
const getDocumentDataMock = vi.fn();
vi.mock('../src/lib/firebase', () => {
  return {
    getCollectionData: getCollectionDataMock,
    getDocumentData: getDocumentDataMock,
  };
});
vi.mock('../src/lib/user', () => {
  return {
    userRef: vi.fn(),
  };
});
vi.mock('../src/lib/userSecret', () => {
  return {
    userSecretsRef: 'dummy-ref',
  };
});

describe('onCreateMessage', async () => {
  const { onCreateMessage } = await import('../src/index');

  it('送信者以外にプッシュ通知が送信される', async () => {
    getCollectionDataMock.mockResolvedValue([
      { id: 'user-id-1', fcmToken: 'token-1' },
      { id: 'user-id-2', fcmToken: 'token-2' },
      { id: 'sender-id', fcmToken: 'token-sender' },
    ]);
    getDocumentDataMock.mockResolvedValue({ id: 'sender-id', name: 'てすたろう' });
    const snapshot = makeDocumentSnapshot(
      { senderId: 'sender-id', content: 'テストメッセージ' },
      'messages/message-id'
    );
    const notification = {
      title: 'てすたろうさんからメッセージが届きました',
      body: 'テストメッセージ',
    };

    const wrappedOnCreateMessage = wrap(onCreateMessage);
    await wrappedOnCreateMessage(snapshot);

    expect(messagingSendMock).toBeCalledTimes(2);
    expect(messagingSendMock).toHaveBeenNthCalledWith(1, { token: 'token-1', notification });
    expect(messagingSendMock).toHaveBeenNthCalledWith(2, { token: 'token-2', notification });
  });
});
