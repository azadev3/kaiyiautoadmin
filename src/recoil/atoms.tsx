import { atom } from "recoil";

export const SidebarLinkLengthState = atom<string>({
  key: "lengthStateKeySidebarLink",
  default: "",
});

export const ToggleSidebarState = atom<boolean>({
  key: "togglesideStateKey",
  default: false,
});

export const TooltipForLinkState = atom<{ [key: string]: boolean }>({
  key: "forLinktooltipKey",
  default: {},
});

export const ComponentModalState = atom<boolean>({
  key: "ComponentModalState",
  default: false,
});
export const ComponentModalStateRefresh = atom<boolean>({
  key: "ComponentModalStateRefresh",
  default: false,
});
export const ComponentModalStateRemove = atom<boolean>({
  key: "ComponentModalStateRemove",
  default: false,
});

export const LoadingState = atom<boolean>({
  key: "LoadingState",
  default: false,
});

export const isTableModalState = atom<string>({
  key: "IsTableModalState",
  default: "",
});

export const EditModalState = atom<string>({
  key: "EditModalState",
  default: "",
});

export const SidebarToggleState = atom<boolean>({
  key: "SidebarToggleState",
  default: false,
});

export const SearchModalState = atom<boolean>({
  key: "searchModalKey",
  default: false,
});

export const IsAuthState = atom<boolean>({
  key: "isAuthStateKey",
  default: false,
});