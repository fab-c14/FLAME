import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  fonts: {
    heading: `Rubik, Rubik Mono One, Inter, Nunito, Lora, sans-serif`,
    body: `Inter, Nunito Sans, Nunito, Roboto, system-ui, sans-serif`,
    mono: `Rubik Mono One, ui-monospace, SFMono-Regular, Menlo, Monaco, monospace`,
  },
});
export default theme;
