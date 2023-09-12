import {ReactNode} from "react";

export type IOption = {
    value: string;
    label: ReactNode;
};

export enum OptionType {
    All = 'All',
    Approve = 'Approve',
    Pending = 'Pending',
    Reject = 'Reject',
}
