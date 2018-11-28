module.exports = {
  meta: {
    id: "en",
    name: "English",
    intl: require("react-intl/locale-data/en")
  },
  loading: "Loading…",
  error: "Error",
  errorMessages: {
    generic: "Some general error thing occurred. Maybe you can find more details somewhere on this page.",
    missingPermission: "You are missing the permission {permission}.",
    noData: "The requested data could not be found. Please check your query.",
    authorizationFailure: "The log in data is incorrect. Please check the username and/or password.",
    notLoggedIn: "You are not logged in - This action requires a valid log in.",
    alreadyLoggedIn: "You are already logged in. If you wish to log into a different account you must first sign out.",
    alreadyExists: "This item already exists. Please edit it instead."
  },
  tag: "Tag",
  tags: "Tags",
  add: "Add",
  notifications: "Notifications",
  noNotifications: "No Notifications!",
  username: "Username",
  password: "Password",
  save: "Save",
  none: "None",
  actions: "Actions",
  edit: "Edit",
  publish: "Publish",
  delete: "Delete",
  discard: "Discard",
  cancel: "Cancel",
  preview: "Preview",
  permissions: "Permissions",
  formValueRequired: "\"{field}\" is required!",
  form: {
    submit: "Submit",
    chooseFile: "Choose a file…",
    noFilesSelected: "No files selected…",
    filesSelected: "{n} files selected."
  },
  editor: {
    formatSelection: "Format selection",
    formatParagraph: "Format paragraph"
  },
  // Navigation
  navigation: {
    home: "Home",
    previousPage: "Previous Page",
    nextPage: "Next Page",
    admin: {
      menu: "Admin",
      overview: "Overview",
      account: "Account",
      newPost: "New Post",
      newPage: "New Page",
      signIn: "Sign in",
      signOut: "Sign out"
    }
  },
  // Admin page
  admin: {
    title: "Overview",
    posts: "Posts",
    users: "Users",
    pages: "Pages"
  },
  // Admin accounts overview page
  users: {
    title: "Users",
    createUser: "Create users",
    updateUser: "Update users",
    updateUserSubtitle: "Username: {id}",
    password: {
      placeholder: "User password",
      confirm: "Confirm user password"
    }
  },  
  page: {
    title: {
      field: "Page name",
      placeholder: "The name of the page - this is displayed e.g. in the browser title."
    },
    notes: {
      field: "Notes",
      placeholder: "Take some quick notes about your page. They are only visible to other maintainers."
    },
    move: {
      title: "Move",
      up: "Move up",
      down: "Move down"
    },
    add: {
      title: "Add new component",
      subtitle: "Select the component that should be added to the page."
    },
    type: {
      card: "Section",
      columns: "Columns"
    },
    path: {
      field: "Path in the navigation",
      placeholder: "Define a custom path…"
    },
    manage: {
      title: "Manage pages",
      newPage: "New page",
      new: "Creating new page…",
      edit: "Editing page: {title}"
    },
    notification: {
      deleted: {
        title: "Page deleted.",
        description: "The page has been deleted. The contents of the page will stay in the editor in case you wish to re-publish it."
      },
      delete: {
        title: "Are you sure?",
        description: "You are about to delete this page. This cannot be undone.",
        confirm: "Understood - Delete regardless"
      },
      published: {
        title: "Published!",
        description: "The page {link} has been published."
      }
    }
  },
  // Strings used for displaying and editing posts
  post: {
    subtitle: "{author} on {date, date, long}",
    mediaTitle: "{title} by {author}, {date, date, medium}",
    noneFound: "No posts could be found. Please try again later.",
    tags: "Tags for categorization…",
    notes: {
      field: "Notes", 
      placeholder: "Take some quick notes about your post. They are only visible to other authors."
    },
    editor: {
      format: {
        bold: "Bold",
        italic: "Italic",
        underlined: "Underlined",
        code: "Code",
        headline1: "Headline 1",
        headline2: "Headline 2",
        quote: "Quote",
        numberedList: "Numbered List",
        bulletedList: "Bulleted List"
      },
      notification: {
        deleted: {
          title: "Post deleted.",
          description: "The post has been deleted. The contents of the post will stay in the editor in case you wish to re-publish it."
        },
        delete: {
          title: "Are you sure?",
          description: "You are about to delete this post. This cannot be undone.",
          confirm: "Understood - Delete regardless"
        },
        published: {
          title: "Published!",
          description: "The post {link} has been published."
        }
      }
    },
    title: {
      new: "Composing post…",
      edit: "Editing post: {title}"
    },
    defaults: {
      title: "New post",
      description: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful."
    }
  },
  tag: {
    title: "Tag: {tag}"
  },
  about: {
    title: "About {id}…",
    permissions: "Permissions:",
    recentPosts: "Latest posts"
  },
  account: {
    title: "Account",
    signIn: "Sign In",
    signOut: "Sign Out",
    changePassword: {
      field1: "Change password",
      field2: "Change password (confirm)",
      field1Placeholder: "Your new password (optional)",
      field2Placeholder: "Confirm your new password (optional)",
      mismatchError: "Both passwords have to be the same. If you do not wish to change your password leave both fields empty."
    },
    confirmPassword: {
      field: "Current Password",
      placeholder: "Enter your current password to confirm"
    },
    bio: {
      field: "Bio",
      placeholder: "Text entered here will be displayed on your public profile page."
    },
    avatar: {
      field: "Change avatar",
      errorTooLarge: "The avatar may not be larger than {maxSize}. (Selected size: {isSize})",
    },
    permissions: "Permissions:",
    welcome: "Welcome, {id}!",
    viewPublic: "View public profile",
    updateProfile: "Update account",
    delete: "Delete account",
    usernamePlaceholder: "your-username",
    passwordPlaceholder: "Your password",
    cookieRequired: "The cookie is required to sign you in.",
    acceptCookie: "I agree to this website using a cookie to sign me into my account.",
    notification: {
      updated: {
        title: "Account updated",
        description: "Your account has been updated. View your public changes here: {link}"
      }
    }
  },
  pages: {
    blog: {
      title: "Blog"
    }
  }
}
