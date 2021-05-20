import { FormInstance } from 'antd'
import { get } from 'lodash'

export default function fillIFormErrors(
    error: unknown,
    form: FormInstance
): void {
    const validationErrors = get(error, 'payload.validationErrors')
    if (!validationErrors) {
        return
    }

    const msgs = Object.keys(validationErrors).map((key) => ({
        name: key,
        errors: [validationErrors[key]],
    }))

    console.log(msgs)
    form.setFields(msgs)
}
