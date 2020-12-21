import axios from 'axios'
import { KYC_API_KEY, KYC_BASE_URL } from '@shared/constants'

const options = {
    headers: {
        "Authorization": `Bearer ${KYC_API_KEY}`,
        "Content-Type": "application/json"

    }
}
const kycCheckApi = async (data: any) => {
    try {
        const apiResult = await axios.post(KYC_BASE_URL, data, options)
        console.log(apiResult.data)
        const responseData = apiResult.data
        let kycResultResponse: any
        switch (responseData.verificationResultCode) {
            case "Y":
                kycResultResponse = {
                    "kycResult": true
                }
                break;
            case "N":
                kycResultResponse = {
                    "kycResult": false
                }
                break;
            default:
                kycResultResponse = {
                    code: `"D" or "S"`,
                    message: `"Document Error" or "Server Error"`
                }
                break
        }
        return kycResultResponse;
    } catch (error) {
        return error.response
    }
}

export default kycCheckApi