export const demoArtistProfile = {
  username: 'demo',
  artistName: 'Luz de Patio',
  roleLine: 'Productora musical, compositora y DJ',
  city: 'Valparaíso',
  country: 'Chile',
  availability: 'Disponible para proyectos',
  coverImageUrl:
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1800&q=85',
  avatarImageUrl:
    'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=400&q=85',
  bio: 'Luz de Patio mezcla electrónica cálida, percusión latinoamericana y canciones para crear experiencias sonoras con identidad. En su perfil puedes descubrir su música, contratar sus servicios y ver trabajos recientes.',
  tags: ['Electrónica', 'Producción musical', 'DJ sets', 'Bandas sonoras'],
  spotifyUrl: 'https://open.spotify.com/',
  youtubeUrl: 'https://www.youtube.com/',
  instagramUrl: 'https://www.instagram.com/',
  publications: [
    {
      id: 'demo-album-orilla',
      type: 'music',
      title: 'Orilla adentro · EP',
      description: 'Cuatro canciones sobre el mar, la noche y volver a casa.',
      isActive: true,
      price: 4900,
      format: 'EP digital',
      imageUrl:
        'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=900&q=85',
    },
    {
      id: 'demo-pack-texturas',
      type: 'digital_product',
      title: 'Pack de texturas costeras',
      description: '24 samples y loops originales para darle movimiento a tus producciones.',
      isActive: true,
      price: 12000,
      sizeLabel: '24 archivos WAV',
      license: 'Uso personal y comercial',
      imageUrl:
        'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=85',
    },
    {
      id: 'demo-produccion',
      type: 'service',
      title: 'Producción y mezcla de una canción',
      description: 'Acompañamiento desde la idea inicial hasta una mezcla lista para publicar.',
      isActive: true,
      format: 'Sesiones online o presenciales',
      imageUrl:
        'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=900&q=85',
    },
    {
      id: 'demo-show',
      type: 'service',
      title: 'DJ set audiovisual',
      description: 'Set de 90 minutos con selección musical y visuales para espacios culturales y marcas.',
      isActive: true,
      format: 'Hasta 200 personas',
      imageUrl:
        'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=85',
    },
    {
      id: 'demo-documental',
      type: 'portfolio',
      title: 'Banda sonora · La ciudad sumergida',
      description: 'Diseño sonoro y música original para un documental independiente.',
      isActive: true,
      format: 'Documental, 2025',
      imageUrl:
        'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85',
    },
    {
      id: 'demo-identidad',
      type: 'portfolio',
      title: 'Identidad sonora · Casa Niebla',
      description: 'Paisaje sonoro y piezas breves para una marca de hospitalidad local.',
      isActive: true,
      format: 'Identidad sonora, 2024',
      imageUrl:
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=85',
    },
  ],
  shows: [
    {
      id: 'demo-show-futuro',
      name: 'Sesiones del Puerto',
      showDate: '2026-10-17T21:00:00.000Z',
      city: 'Valparaíso',
    },
    {
      id: 'demo-show-anterior',
      name: 'Festival Bruma',
      showDate: '2026-05-23T21:00:00.000Z',
      city: 'Santiago',
    },
  ],
}
