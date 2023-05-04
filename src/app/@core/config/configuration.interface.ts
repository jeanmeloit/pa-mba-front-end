import { NbMenuItem } from '@nebular/theme'

export interface Configuration {
  app: {
    name?: string
    title?: string
    aboutTitle?: string
    aboutDescription?: string
    headerbar?: {
      /**
       * @Param
       * @deprecated
       * Este elemento determina se a headerbar é absoluta sob a sidebar, caso falso a sidebar é exibida de forma independente do layout,
       * ao lado absoluto qual foi definido
       */
      subheader?: boolean
    }
    /**
     * @Params
     * Sempre um elemento(right e left) deve ser true e outro false para correta exibição da sidebar.
     */
    sidebar?: {
      right?: boolean
      left?: boolean
    }
    layout?: {
      windowMode?: boolean
    }
  }
  header?: {
    title?: string
    showNotifications?: boolean
    showFavorites?: boolean
    showNewWindow?: boolean
    showThemeSelector?: boolean
    showSystemSelector?: boolean
    themes?: ThemeDto[]
    userMenu?: NbMenuItem[]
    themeMenu?: NbMenuItem[]
  }
  footer?: {
    title?: string
    showLinkedin?: boolean
    linkedinLink?: string
    showFacebook?: boolean
    facebookLink?: string
    showInstagram?: boolean
    instagramLink?: string
    showTwitter?: boolean
    twitterLink?: string
  }
  enviroment?: {
    dev?: string
    homolog?: string
    prod?: string
  }
  backoffice?: {
    dev?: string
    homolog?: string
    prod?: string
  }
  system?: {
    id: string
  }

  backend?: {
    mainUrl?: string
  }
}

export interface ThemeDto {
  value: string
  name: string
}
