module.exports = {
  meta: {
    id: "de",
    name: "Deutsch",
    intl: require("react-intl/locale-data/de")
  },
  loading: "Lädt…",
  error: "Fehler",
  errorMessages: {
    generic: "Ein allgemeiner Fehler ist aufgetreten! Vielleicht finden Sie vage Details weiter unten!",
    missingPermission: "Ihnen fehlt die Berechtigung {permission}.",
    noData: "Die angefragten Daten konnten nicht gefunden werden. Bitte überprüfen Sie Ihre Eingabe.",
    authorizationFailure: "Die Anmeldedaten ist falsch. Bitte überprüfen Sie Benutzername und/oder Passwort.",
    notLoggedIn: "Sie sind nicht angemeldet - Für diese Aktion ist eine Anmeldung erfordelich.",
    alreadyLoggedIn: "Sie sind bereits angemeldet. Um sich in einem anderen Account anzumelden, müssen Sie sich zunächst aus diesem abmelden.",
    alreadyExists: "Dieser Datensatz existiert bereits. Bitte bearbeiten Sie ihn stattdessen."
  },
  title: "Titel",
  subtitle: "Untertitel",
  tag: "Tag",
  tags: "Tags",
  add: "Hinzufügen",
  notifications: "Benachrichtigungen",
  noNotifications: "Keine Benachrichtigungen!",
  username: "Benutzername",
  password: "Passwort",
  save: "Speichern",
  none: "Keine",
  actions: "Aktionen",
  edit: "Bearbeiten",
  publish: "Veröffentlichen",
  delete: "Löschen",
  discard: "Verwerfen",
  cancel: "Abbrechen",
  preview: "Vorschau",
  permissions: "Berechtigungen",
  formValueRequired: "\"{field}\" muss angegeben werden!",
  form: {
    submit: "Senden",
    chooseFile: "Datei auswählen…",
    noFilesSelected: "Keine Dateien ausgewählt…",
    filesSelected: "{n} Dateien ausgewählt."
  },
  editor: {
    formatSelection: "Selektion formatieren",
    formatParagraph: "Absatz formatieren"
  },
  // Navigation
  navigation: {
    home: "Startseite",
    previousPage: "Vorherige Seite",
    nextPage: "Nächste Seite",
    admin: {
      menu: "Administration",
      overview: "Übersicht",
      account: "Benutzerkonto",
      newPost: "Neuer Post",
      newPage: "Neue Seite",
      signIn: "Anmelden",
      signOut: "Abmelden"
    }
  },
  // Admin page
  admin: {
    title: "Übersicht",
    posts: "Posts",
    users: "Benutzer",
    pages: "Seiten",
  },
  // Admin accounts overview page
  users: {
    title: "Benutzer",
    createUser: "Benutzer erstellen",
    updateUser: "Benutzer aktualisieren",
    updateUserSubtitle: "Benutzername: {id}",
    password: {
      placeholder: "Passwort des Nutzers",
      confirm: "Passwort bestätigen"
    }
  },
  page: {
    title: {
      field: "Seitenname",
      placeholder: "Der Name der Seite - wird unter anderen im Browsertitel angezeigt."
    },
    notes: {
      field: "Notizen",
      placeholder: "Hier können Sie Notizen zu dieser Seite festhalten. Diese sind nur von anderen Verwaltern sichtbar."
    },
    move: {
      title: "Bewegen",
      up: "Nach oben",
      down: "Nach unten"
    },
    add: {
      title: "Neue Komponente hinzufügen",
      subtitle: "Wählen Sie die Komponente aus, welche zur Seite hinzugefügt werden soll."
    },
    type: {
      card: "Abschnitt",
      columns: "Spalten",
      hero: "Eröffnendes Banner"
    },
    path: {
      field: "Pfad in der Navigation",
      placeholder: "Eigenen Pfad definieren…"
    },
    manage: {
      title: "Seiten verwalten",
      newPage: "Neue Seite",
      new: "Seite erstellen…",
      edit: "Bearbeite Seite: {title}",
      chooseType: "Typ wählen…",
      currentType: "Aktueller Typ",
      types: {
        default: "Standard",
        primary: "Primär",
        info: "Information",
        success: "Erfolg",
        warning: "Warnung",
        danger: "Gefahr",
        light: "Hell",
        dark: "Dunkel"
      }
    },
    notification: {
      deleted: {
        title: "Seite gelöscht.",
        description: "Die Seite wurde gelöscht. Der Inhalt der Seite bleibt im Editor erhalten, falls Sie diese erneut veröffentlichen möchten."
      },
      delete: {
        title: "Sind Sie sicher?",
        description: "Sie sind dabei diese Seite zu löschen. Diese Aktion ist permanent und kann nicht rückgängig gemacht werden.",
        confirm: "Verstanden - Trotzdem löschen"
      },
      published: {
        title: "Veröffentlicht!",
        description: "Die Seite {link} wurde veröffentlicht."
      }
    }
  },
  // Strings used for displaying and editing posts
  post: {
    subtitle: "{author} am {date, date, long}",
    mediaTitle: "{title} von {author}, {date, date, medium}",
    noneFound: "Es konnten keine Posts gefunden werden. Bitte versuchen Sie es später erneut.",
    tags: "Tags zum kategorisieren…",
    notes: {
      field: "Notizen",
      placeholder: "Hier können Sie Notizen zu diesem Post festhalten. Diese sind nur von anderen Authoren sichtbar."
    },
    editor: {
      format: {
        bold: "Fett",
        italic: "Kursiv",
        underlined: "Unterstrichen",
        code: "Code",
        headline1: "Überschrift 1",
        headline2: "Überschrift 2",
        quote: "Zitat",
        numberedList: "Nummerierte Liste",
        bulletedList: "Ungeordnete Liste"
      },
      notification: {
        deleted: {
          title: "Post gelöscht.",
          description: "Der Post wurde gelöscht. Der Inhalt des Posts bleibt im Editor erhalten, falls Sie diesen erneut veröffentlichen möchten."
        },
        delete: {
          title: "Sind Sie sicher?",
          description: "Sie sind dabei diesen Post zu löschen. Diese Aktion ist permanent und kann nicht rückgängig gemacht werden.",
          confirm: "Verstanden - Trotzdem löschen"
        },
        published: {
          title: "Veröffentlicht!",
          description: "Der Post {link} wurde veröffentlicht."
        }
      }
    },
    title: {
      new: "Post verfassen…",
      edit: "Bearbeite Post: {title}"
    },
    defaults: {
      title: "Neuer Post",
      description: "Damit Ihr indess erkennt, woher dieser ganze Irrthum gekommen ist, und weshalb man die Lust anklagt und den Schmerz lobet, so will ich Euch Alles eröffnen und auseinander setzen, was jener Begründer der Wahrheit und gleichsam Baumeister des glücklichen Lebens selbst darüber gesagt hat. Niemand, sagt er, verschmähe, oder hasse, oder fliehe die Lust als solche, sondern weil grosse Schmerzen ihr folgen, wenn man nicht mit Vernunft ihr nachzugehen verstehe."
    }
  },
  tag: {
    title: "Tag: {tag}"
  },
  about: {
    title: "Über {id}…",
    recentPosts: "Neueste Posts"
  },
  account: {
    title: "Benutzerkonto",
    signIn: "Anmelden",
    signOut: "Abmelden",
    changePassword: {
      field1: "Passwort ändern",
      field2: "Passwort ändern (erneut eingeben)",
      field1Placeholder: "Ihr neues Passwort (optional)",
      field2Placeholder: "Ihr neues Passwort bestätigen (optional)",
      mismatchError: "Beide Passwörter müssen übereinstimmen. Falls Sie das Passwort nicht ändern möchten, lassen Sie beide Felder frei."
    },
    confirmPassword: {
      field: "Aktuelles Passwort",
      placeholder: "Geben Sie Ihr Passwort zum Bestätigen ein"
    },
    bio: {
      field: "Informationen über Sie",
      placeholder: "Der hier eingegebene Text ist auf Ihrer Profilseite für Besucher der Webseite sichtbar."
    },
    avatar: {
      field: "Avatar ändern",
      errorTooLarge: "Der Avatar darf nicht größer als {maxSize} sein. (Gewählte Größe: {isSize})",
    },
    welcome: "Willkommen, {id}!",
    viewPublic: "Öffentliches Profil ansehen",
    updateProfile: "Benutzerprofil aktualisieren",
    delete: "Benutzerkonto löschen",
    usernamePlaceholder: "ihr-username",
    passwordPlaceholder: "Ihr Passwort",
    cookieRequired: "Der Cookie wird benötigt um Sie anzumelden.",
    acceptCookie: "Ich bin einverstanden, dass ein Cookie in meinem Browser gespeichert wird um mich einzuloggen.",
    notification: {
      updated: {
        title: "Benutzerkonto aktualisiert",
        description: "Ihr Benutzerkonto wurde aktualisiert. Sie können sich die öffentlichen Änderungen hier ansehen: {link}"
      }
    }
  },
  pages: {
    blog: {
      title: "Blog"
    }
  }
}
