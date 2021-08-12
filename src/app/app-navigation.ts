export const navigation = [
  {
    text: 'Météo',
    path: '/weather',
    icon: 'globe'
  },
 
  {
    text: 'Barrage',
    icon: 'chart',
    items: [
      
      {
        text: 'Tableau barrages',
        path: '/barrages'
      },
      {
        text: 'Moy.réserve ',
        path: '/chart'
      },
      {
        text: 'Moy.taux de remplissage ',
        path: '/chart2'
      },
      {
        text: 'Capacité normale ',
        path: '/chart3'
      },
      
      {
        text: 'Tableau croisé',
        path: '/pivot'
      },


    ]
  },
  {
    text: 'Prédiction taux remplissage',
    path: '/predict',
    icon: 'verticalaligntop'
  },
  {
    text: 'Prédiction réserve',
    path: '/predict-reserve',
    icon: 'verticalaligntop'
  }
];
