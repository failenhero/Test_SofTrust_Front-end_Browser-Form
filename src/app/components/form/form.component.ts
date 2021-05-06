import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Topic from 'src/app/interfaces/topic-interface';
import { HttpService } from 'src/app/services/http.service';
import FormText from 'src/app/interfaces/formText-interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit {

  public isSubmitted: boolean = false;

  public messageForm: FormGroup |any;
  public allTopics = [] as Topic[];
  public selectedTopic!: string;

  public messageToSend = {} as FormText;

  public nameBlur: boolean = true;
  public maleBlur: boolean = true;
  public phoneBlur: boolean = true;

   public mask: Array<string | RegExp>;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private router: Router
  ) {
    this.mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  }

  ngOnInit(): void {
    this.initForm();
    this.getAllTopics();
  }

  submitForm() {

    if(this.messageForm.valid) {

      this.messageToSend.Name = this._name.value;
      this.messageToSend.Email = this._email.value;
      this.messageToSend.Phone = this._phone.value;
      this.messageToSend.TopicId = Number(this._topic.value);
      this.messageToSend.Message = this._message.value;

      this.selectedTopic = this.allTopics.find(topic => topic.topicId === this.messageToSend.TopicId)?.topicName ?? ""

      this.httpService.postForm(this.messageToSend)
      .subscribe(
        (res) => {
          this.isSubmitted = true;
          this.initForm();
        },
        error => {
          console.log(error)
          if(error.status == 0) {
          alert("Возникли проблемы с подключением к серверу. Пожалуйста, устраните их прежде, чем продолжить.")
          }
        });

    } else {
      alert('form is invalid')
    }
  }

  getAllTopics() {
    this.httpService.gettopicsList().subscribe(
      res => {
        console.log('res', res)
      this.allTopics = res;
    },
      err => {
        console.log('err', err)
      })
  }

  initForm() {
    this.messageForm = this.fb.group({
      name: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.email,
        Validators.required
      ]],
      phone: ['', [
        Validators.maxLength(15),
        Validators.minLength(9),
        Validators.required
      ]],
      topic: ['', [
        Validators.required
      ]],
      message: ['', [
        Validators.minLength(10),
        Validators.required
      ]]
    })
  }

  goBack() {
    this.isSubmitted = false;
  }

  get _name() {
    return this.messageForm.get('name');
  }

  get _email() {
    return this.messageForm.get('email');
  }

  get _phone() {
    return this.messageForm.get('phone');
  }

  get _topic() {
    return this.messageForm.get('topic');
  }

  get _message() {
    return this.messageForm.get('message');
  }

  nameFocused(){
    this.nameBlur = false;
  }

  nameBlured() {
    this.nameBlur = true;
  }

  emailFocused() {
    this.maleBlur = false;
  }

  emailBlured() {
    this.maleBlur = true;
  }

  phoneFocused() {
    this.phoneBlur = false;
  }

  phoneBlured() {
    this.phoneBlur = true;
  }

}


