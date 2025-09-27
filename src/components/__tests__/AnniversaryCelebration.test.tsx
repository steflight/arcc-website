import { render, screen, waitFor } from '@testing-library/react'
import AnniversaryCelebration from '../AnniversaryCelebration'

describe('AnniversaryCelebration', () => {
  it('affiche les confettis quand visible', async () => {
    const mockOnClose = jest.fn()
    
    render(
      <AnniversaryCelebration 
        isVisible={true} 
        onClose={mockOnClose} 
      />
    )

    // Vérifier que la modal est visible
    expect(screen.getByText('Joyeux Anniversaire !')).toBeInTheDocument()
    
    // Vérifier que les confettis sont présents
    await waitFor(() => {
      const confettiContainer = document.querySelector('.absolute.inset-0.pointer-events-none')
      expect(confettiContainer).toBeInTheDocument()
    })
  })

  it('ne s\'affiche pas quand invisible', () => {
    const mockOnClose = jest.fn()
    
    render(
      <AnniversaryCelebration 
        isVisible={false} 
        onClose={mockOnClose} 
      />
    )

    expect(screen.queryByText('Joyeux Anniversaire !')).not.toBeInTheDocument()
  })
})
