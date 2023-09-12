
import { create } from "zustand";

export const useIsProcessingStore = create<boolean>(()=>false);


export function checkIsProcessing(target: any , propertyKey: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;

    // @ts-ignore
    descriptor.value = async function (...args) {
        if(useIsProcessingStore.getState()) return;
        useIsProcessingStore.setState(true);

        try {
            return await original.call(this, ...args);
        } finally {
            useIsProcessingStore.setState(false);
        }
    }
}

export function resetIsProcessing() {
    useIsProcessingStore.setState(false);
}
