

export const useCustomer = () => {
    const customerName = useCookie('customerName', {
        default: () => '',
    });
    const hasNameError = computed(() => {
        return customerName.value.length < 2
    })
    const customerInitials = computed(() => {
        const names = customerName.value.split(' ')
        if (names.length < 2) {
            return customerName.value.substring(0, 2)
        }
        
        return names.map(name => name[0]).join('').toUpperCase()
    })
    return { customerName, hasNameError, customerInitials }
}