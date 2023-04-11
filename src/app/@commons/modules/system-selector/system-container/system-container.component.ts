import { Component, Input, OnInit } from '@angular/core'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { SanitizePipe } from '@pipes/sanitize/sanitize.pipe'
import { first } from 'rxjs/operators'

import { SystemContainerService } from './system-container.service'

@Component({
  selector: 'pds-system-container',
  templateUrl: './system-container.component.html',
  styleUrls: ['./system-container.component.scss'],
})
export class SystemContainerComponent implements OnInit {
  @Input() public containerTitle: string

  public modules: any[] = []

  constructor(
    private service: SystemContainerService,
    private domSanitizer: DomSanitizer,
    private sanitize: SanitizePipe,
  ) {}

  public ngOnInit(): void {
    this.getModules()
  }

  private getModules(): void {
    this.service
      .get()
      .pipe(first())
      .subscribe((data: any) => {
        for (const module of data.dados) {
          if (
            this.sanitize.transform(module.nome.toLowerCase()) !==
            'planejamento'
          ) {
            this.modules.push(module)
          }
        }
      })
  }

  public switchModules(module: any): void {
    window.open(module.link, '_self')
  }

  public getLogoBase64(base64: string): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(
      `data:image/png;base64,${base64}`,
    )
  }
}
