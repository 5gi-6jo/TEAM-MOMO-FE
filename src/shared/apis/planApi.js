import axios from 'axios';

class PlanApi {
  constructor() {
    // this.base = 'http://localhost:3000';
    // this.base = process.env.REACT_APP_BE_IP_LYW;
    this.base = process.env.REACT_APP_BE_IP_LYW;
  }

  async getPlans() {
    const getpostConfig = {
      method: 'get',
      url: `${this.base}/plans/main`,
      headers: {},
    };

    return axios(getpostConfig)
      .then(res => {
        console.log(res.data);
        if (res.data.success === 'true') {
          return res.data.data;
        }
      })
      .catch(err => {
        console.log(err);
        console.log(err.messages);
      });
  }
  async getOnePlan({ planId, dispatch }) {
    const getonepostConfig = {
      method: 'get',
      url: `${this.base}/plans/${planId}`,
      headers: {},
    };

    return axios(getonepostConfig)
      .then(res => {
        if (res.data.success === true) {
          // dispatch(getOnePlan(res.data.data));
          return res.data.data;
        }
        return;
      })
      .catch(err => {
        console.log(err);
        console.log(err.messages);
      });
  }
}
export default PlanApi;

// export { instance, token, settoken };
