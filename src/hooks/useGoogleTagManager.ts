'use client'

declare global {
  interface Window {
    dataLayer: any[]
  }
}

export const useGoogleTagManager = () => {
  const pushEvent = (event: string, data?: any) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event,
        ...data,
        timestamp: new Date().toISOString(),
        page: window.location.pathname,
      })
    }
  }

  const trackPageView = (page: string) => {
    pushEvent('page_view', { page })
  }

  const trackButtonClick = (buttonName: string, location?: string) => {
    pushEvent('button_click', { 
      button_name: buttonName,
      location: location || window.location.pathname 
    })
  }

  const trackFormSubmission = (formName: string, success: boolean) => {
    pushEvent('form_submission', { 
      form_name: formName,
      success,
      timestamp: new Date().toISOString()
    })
  }

  const trackContactAction = (action: string, method: string) => {
    pushEvent('contact_action', { 
      action,
      method,
      timestamp: new Date().toISOString()
    })
  }

  const trackBlogInteraction = (action: string, postTitle?: string, category?: string) => {
    pushEvent('blog_interaction', { 
      action,
      post_title: postTitle,
      category,
      timestamp: new Date().toISOString()
    })
  }

  const trackLanguageChange = (fromLanguage: string, toLanguage: string) => {
    pushEvent('language_change', { 
      from_language: fromLanguage,
      to_language: toLanguage,
      timestamp: new Date().toISOString()
    })
  }

  return {
    pushEvent,
    trackPageView,
    trackButtonClick,
    trackFormSubmission,
    trackContactAction,
    trackBlogInteraction,
    trackLanguageChange,
  }
}
