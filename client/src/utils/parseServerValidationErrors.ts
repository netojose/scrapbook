import { get } from 'lodash'

export default function parseServerValidationErrors(
    response: unknown
): Record<string, string> {
    let validationErrors
    const type = get(response, 'errors[0].message')
    if (type === 'Argument Validation Error') {
        const errors = get(
            response,
            'errors[0].extensions.exception.validationErrors',
            []
        )

        if (errors.length > 0) {
            validationErrors = errors.reduce(
                (
                    acc: Record<string, string>,
                    curr: Record<string, string>
                ) => ({
                    ...acc,
                    [curr.property]: Object.values(curr.constraints)[0],
                }),
                {}
            )
        }
    }

    return validationErrors
}
