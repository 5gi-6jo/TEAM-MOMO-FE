export const MOCK = {
  Plans: {
    success: true,
    message: 'success',
    data: [
      {
        finished: false,
        planDate: '2022-03-15T21:21:00',
        planId: 1,
        planName: '약속명',
      },
      {
        finished: false,
        planDate: '2022-03-15T21:21:00',
        planId: 2,
        planName: '약속명',
      },
      {
        finished: false,
        planDate: '2022-03-15T21:21:00',
        planId: 3,
        planName: '약속명',
      },
    ],
  },
  PlanDetail: {
    success: true,
    message: 'success',
    data: {
      planDate: '2022-03-15T21:21',
      imageList: [
        {
          imageId: 1,
          image:
            'https://firebasestorage.googleapis.com/v0/b/myinsta-60d69.appspot.com/o/images%2F3_1646061142073?alt=media&token=6d4d55e7-e0df-4a41-899a-bc2ce76bc95a',
        },
        {
          imageId: 2,
          image:
            'https://firebasestorage.googleapis.com/v0/b/myinsta-60d69.appspot.com/o/images%2Fundefined_1646148025085?alt=media&token=204dc65c-d74c-470d-b3ee-bb955962f1b7',
        },
        {
          imageId: 3,
          image:
            'https://firebasestorage.googleapis.com/v0/b/myinsta-60d69.appspot.com/o/images%2Fundefined_1646147860738?alt=media&token=f0e60a71-d45b-43cb-8939-0b2f8fbb7ca8',
        },
        {
          imageId: 4,
          image:
            'https://firebasestorage.googleapis.com/v0/b/myinsta-60d69.appspot.com/o/images%2Fundefined_1646148008556?alt=media&token=7701153d-43d6-42e5-a94a-0e1f49913a18',
        },
        {
          imageId: 5,
          image:
            'https://firebasestorage.googleapis.com/v0/b/myinsta-60d69.appspot.com/o/images%2Fundefined_1646148469611?alt=media&token=e1361922-3a25-48b8-acd9-87a41c527d14',
        },
      ],
      contents: '본문',
      planName: '약속명',
      destination: '장소',
    },
  },
};
