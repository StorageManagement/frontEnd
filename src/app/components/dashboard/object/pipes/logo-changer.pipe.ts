import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'logoChanger',
  standalone: true
})
export class LogoChangerPipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'mp3': {
        return 'assets/images/Music.svg'
      }
      case 'pdf': {
        return 'assets/images/Logo PDF.svg'
      }
      case 'wav': {
        return 'assets/images/Audio.svg'
      }
      default: {
        return 'assets/images/Others file.svg'
      }
    }
  }

}
