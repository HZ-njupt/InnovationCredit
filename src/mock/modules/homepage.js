export function login () {
    return {
      // isOpen: false,
      url: 'http://localhost:8080/homepage',
      type: 'get',
      data: {
        'msg': 'success',
        'code': 0,
        'data': [
            {
                anouncement:'About NJUPT-SCS-Student-Information-Inquiry-System',
                date: '2020-02-01'
            },
            {
                anouncement:'222222222',
                date: '2020-02-02'
            },
        ]
      }
    }
  }