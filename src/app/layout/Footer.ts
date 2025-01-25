import {Component} from "@angular/core";

@Component({
    selector: 'app-footer',
    standalone: true,
    template: `
        <footer class="p-5 bg-primary text-white text-center">
        <p>© 2025 - Harry Potter</p>
        </footer>
    `,
    styles: []
})

export class FooterComponent {
}