import { useToast, IToastProps } from "native-base";

export default function useToastAlert() {
    const toast = useToast()
    return {
        sucess: (toastProps : IToastProps) => toast.show({ bg:"indigo.500", ...toastProps }),
        error: (toastProps : IToastProps)  => toast.show({ bg:"red.500"   , ...toastProps })
    }
}